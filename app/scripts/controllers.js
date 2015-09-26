(function() {
  'use strict';

  angular
    .module('blog.controllers', ['blog.services'])
    .controller('PostListController', PostListController)
    .controller('PostCreateController', PostCreateController)
    .controller('PostDetailController', PostDetailController);

  // controllers

  // post list controller
  function PostListController(Post){
    this.posts = Post.query();
  }

  // post detail controller
  function PostDetailController($routeParams, Post, Comment){

    this.post = {};
    this.comments = {};
    this.user = {};

    var self = this;

    Post.query({id: $routeParams.postId})
    .$promise.then(
      // success
      function(data){
        self.post = data[0];
        self.user = User.query({id: self.post.userId});
      },
      // error
      function(error) {
        console.log(error);
      }
    );
    this.comments = Comment.query({postId: $routeParams.postId});
  }

  function PostCreateController(Post) {
    var self = this;

    this.create = function () {
      Post.save(self.post);
    };
  };
})();
