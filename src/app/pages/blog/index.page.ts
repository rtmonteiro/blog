import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import { DateTime } from 'luxon';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>My Blogecito</h1>

    <section class="cards">
      @for (post of posts ; track post.attributes.slug) {
      <a [routerLink]="['/blog/', post.attributes.slug]">
        <article class="card">
          <header>
            <time class="card__time">{{ post.attributes.relativeDate }}</time>
            <h2 class="card__title">{{ post.attributes.title }}</h2>
          </header>
          <img class="card__cover-image" [src]="post.attributes.coverImage" [alt]="post.attributes.title" />
          <div class="card__body">
            <p class="card__desc">{{ post.attributes.description }}</p>
          </div>
        </article>
      </a>
      }
    </section>

    <footer>
      <p>
        There {{ posts.length > 1
          ? 'are ' + posts.length + ' posts'
          : 'is ' + posts.length + ' post' }}
        </p>
      <p>Made with ❤️ by <a href="https://github.com/rtmonteiro" target="_blank">Ryan Monteiro</a></p>
    </footer>
  `,
  styles: `

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;

      a {
        text-align: left;
        display: block;
        margin-bottom: 2rem;
        color: whitesmoke;
        &:hover {
          h2, p {
            transition: color 150ms;
            color: grey;
          }
          img {
            transition: filter 150ms;
            filter: grayscale(100%);
          }
        }
      }

      .card__desc {
        font-weight: bold;
      }

      .card__cover-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    }

    footer {
      a {
        display: inline;
      }
    }

  `,
})
export default class BlogComponent {

  sortPosts = (a: ContentFile<PostAttributes>, b: ContentFile<PostAttributes>) => {
    return new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime();
  };
  readonly posts = injectContentFiles<PostAttributes>()
    .filter((post) => post.attributes.active)
    .sort(this.sortPosts)
    .map((post) => {
      return {
        ...post,
        attributes: {
          ...post.attributes,
          relativeDate: this.getHowLongHasBeenCreated(post.attributes.createdAt),
        },
      };
    });

  getHowLongHasBeenCreated(date: string) {
    return DateTime.fromISO(date).toRelative({ locale: 'en' });
  }
}
