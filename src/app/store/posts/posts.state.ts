import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Posts } from './posts.model';
import { AddPost, RemovePost } from '../../store/posts/posts.actions';

export class PostsStateModel {
  posts: Posts[];
}

@State({
  name: 'posts',
  defaults: {
    posts: []
  }
})
export class PostsState {
  @Selector()
  static getPosts(state: PostsStateModel) {
    return state.posts;
  }

  @Action(AddPost)
  add({ getState, patchState }: StateContext<PostsStateModel>, { payload }: AddPost) {
    const state = getState();
    patchState({
      posts: [... state.posts, payload]
    })
  }

  @Action(RemovePost)
  remove({ getState, patchState }: StateContext<PostsStateModel>, { payload }: RemovePost) {
    patchState({
      posts: getState().posts.filter(post => post.id != payload)
    })
  }
}
