import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentFile, injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>My Blogecito</h1>

    <div class="cards">
      @for (post of posts ; track post.attributes.slug) {
      <a [routerLink]="['/blog/', post.attributes.slug]">
        <article class="card">
          <header>
            <time>{{ post.attributes.createdAt }}</time>
            <h2 class="card__title">{{ post.attributes.title }}</h2>
          </header>
          <img class="card__cover-image" [src]="post.attributes.coverImage" [alt]="post.attributes.title" />
          <div class="card__body">
            <p class="card__desc">{{ post.attributes.description }}</p>
          </div>
        </article>
      </a>
      }
    </div>
  `,
  styles: `
    a {
      text-align: left;
      display: block;
      margin-bottom: 2rem;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .card__cover-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  `,
})
export default class BlogComponent {

  sortPosts = (a: ContentFile<PostAttributes>, b: ContentFile<PostAttributes>) => {
      return new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime();
    };
  readonly posts = injectContentFiles<PostAttributes>().sort(this.sortPosts);
}
