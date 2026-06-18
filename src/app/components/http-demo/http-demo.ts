import { Component, inject, signal, OnInit, TemplateRef, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsService, Post, CreatePost } from '../../services/posts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-http-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './http-demo.html',
  styleUrl: './http-demo.scss'
})
export class HttpDemoComponent implements OnInit {
  private postsService = inject(PostsService);
  private http = inject(HttpClient);
  @Input() rowTemplate!: TemplateRef<any>;
  signal_test : WritableSignal<boolean> = signal(false)


  // ── State signals ──────────────────────────────────────────────
  posts       = signal<Post[]>([]);
  selectedPost = signal<Post | null>(null);
  isLoading   = signal(false);
  errorMsg    = signal('');
  successMsg  = signal('');

  // ── Form state ─────────────────────────────────────────────────
  newPost: CreatePost = { userId: 1, title: '', body: '' };
  filterUserId = 1;

  ngOnInit() {
    this.loadPosts();
  }

  // ── GET all ────────────────────────────────────────────────────
  loadPosts() {
    this.setLoading(true);
    this.postsService.getPosts().subscribe({
      next: posts => {
        this.posts.set(posts.slice(0, 10)); // show first 10
        this.setLoading(false);
      },
      error: err => this.setError(err.message)
    });
  }

  // ── GET by id ──────────────────────────────────────────────────
  loadPostById(id: number) {
    this.setLoading(true);
    this.postsService.getPostById(id).subscribe({
      next: post => {
        this.selectedPost.set(post);
        this.setLoading(false);
      },
      error: err => this.setError(err.message)
    });
  }

  // ── GET with query params ──────────────────────────────────────
  loadByUser() {
    this.setLoading(true);
    this.postsService.getPostsByUser(this.filterUserId).subscribe({
      next: posts => {
        this.posts.set(posts.slice(0, 10));
        this.setLoading(false);
      },
      error: err => this.setError(err.message)
    });
  }

  // ── POST ───────────────────────────────────────────────────────
  createPost() {
    if (!this.newPost.title || !this.newPost.body) return;
    this.setLoading(true);
    this.postsService.createPost(this.newPost).subscribe({
      next: post => {
        // Prepend to list (JSONPlaceholder returns id: 101)
        this.posts.update(posts => [post, ...posts]);
        this.newPost = { userId: 1, title: '', body: '' };
        this.setSuccess(`Post created with ID: ${post.id}`);
      },
      error: err => this.setError(err.message)
    });
  }

  // ── PUT ────────────────────────────────────────────────────────
  updatePost(post: Post) {
    const updated: Post = { ...post, title: post.title + ' (updated)' };
    this.postsService.updatePost(updated).subscribe({
      next: res => {
        this.posts.update(posts =>
          posts.map(p => p.id === res.id ? res : p)
        );
        this.setSuccess(`Post ${res.id} updated`);
      },
      error: err => this.setError(err.message)
    });
  }

  // ── DELETE ─────────────────────────────────────────────────────
  deletePost(id: number) {
    this.postsService.deletePost(id).subscribe({
      next: () => {
        this.posts.update(posts => posts.filter(p => p.id !== id));
        this.setSuccess(`Post ${id} deleted`);
      },
      error: err => this.setError(err.message)
    });
  }

  // ── Helpers ────────────────────────────────────────────────────
  private setLoading(val: boolean) {
    this.isLoading.set(val);
    this.errorMsg.set('');
  }

  private setError(msg: string) {
    this.errorMsg.set(msg);
    this.isLoading.set(false);
  }

  private setSuccess(msg: string) {
    this.successMsg.set(msg);
    this.isLoading.set(false);
    setTimeout(() => this.successMsg.set(''), 3000);
  }

  trackById(_: number, p: Post) { return p.id; }

  testRetry() {
  this.http.get('https://httpstat.us/500').subscribe({
    error: err => console.log('Final error after retries:', err.message)
  });
}
testPublicUrl() {
  // This URL contains '/auth/login' — interceptor should skip token
  this.http.get('https://jsonplaceholder.typicode.com/auth/login/1')
    .subscribe({ error: () => {} }); // ignore error, just check headers
}
}