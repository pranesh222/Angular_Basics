import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { increment, decrement, reset, incrementBy } from '../../store/counter/counter.actions';
import { loadPosts, addPost, deletePost } from '../../store/posts/posts.actions';
import {
  selectCount, selectIsPositive, selectIsNegative, selectCountDoubled
} from '../../store/counter/counter.selectors';
import {
  selectAllPosts, selectLoading, selectError, selectPostsCount
} from '../../store/posts/posts.selectors';
import { Post } from '../../services/posts';

@Component({
  selector: 'app-ngrx-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './ngrx-demo.html',
  styleUrl: './ngrx-demo.scss'
})
export class NgrxDemoComponent implements OnInit {
  private store = inject(Store);

  // ── Counter selectors — Observable streams from store ──────────
  count$       = this.store.select(selectCount);
  isPositive$  = this.store.select(selectIsPositive);
  isNegative$  = this.store.select(selectIsNegative);
  doubled$     = this.store.select(selectCountDoubled);

  // ── Posts selectors ────────────────────────────────────────────
  posts$      = this.store.select(selectAllPosts);
  loading$    = this.store.select(selectLoading);
  error$      = this.store.select(selectError);
  postCount$  = this.store.select(selectPostsCount);

  // ── Local UI state ─────────────────────────────────────────────
  incrementAmount = 5;
  newPostTitle    = '';
  newPostBody     = '';

  ngOnInit() {
    // Dispatch action to load posts on init
    this.store.dispatch(loadPosts());
  }

  // ── Counter actions ────────────────────────────────────────────
  increment()   { this.store.dispatch(increment()); }
  decrement()   { this.store.dispatch(decrement()); }
  reset()       { this.store.dispatch(reset()); }
  incrementBy() {
    this.store.dispatch(incrementBy({ amount: this.incrementAmount }));
  }
// Add this method to the class
reloadPosts() {
  this.store.dispatch(loadPosts());
}
  // ── Posts actions ──────────────────────────────────────────────
  addPost() {
    if (!this.newPostTitle || !this.newPostBody) return;
    const post: Post = {
      id: 0, userId: 1,
      title: this.newPostTitle,
      body:  this.newPostBody
    };
    this.store.dispatch(addPost({ post }));
    this.newPostTitle = '';
    this.newPostBody  = '';
  }

  deletePost(id: number) {
    this.store.dispatch(deletePost({ id }));
  }

  trackById(_: number, post: Post) { return post.id; }
}