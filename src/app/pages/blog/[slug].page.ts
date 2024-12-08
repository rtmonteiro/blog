import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent],
  template: `
    @if (post$ | async; as post) {
    <article>
      <img class="post__image" [src]="post.attributes.coverImage" />
      <div class="post__tags">
        @for (tag of post.attributes.tags; track $index) {
          <span class="post__tag">{{ tag }}</span>
        }
      </div>
      <analog-markdown [content]="post.content" />
    </article>
    }
  `,
  styles: `
    .post__tag {
      margin-right: 0.5rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      background-color: #f0f0f0;
      color: #333;
    }
    .post__image {
      max-height: 40vh;
    }
  `,
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>('slug');
}
