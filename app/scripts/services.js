(function(){
  'use strict';

  angular
    .module('blog.services', ['ngResource'])
    .constant('BaseUrl', 'http://jsonplaceholder.typicode.com')
    .factory('Post', Post)
    .factory('Comment', Comment)
    .factory('User', User);

  // factories

  // Post factory
  function Post($resource, BaseUrl) {
    return $resource(BaseUrl + '/posts/:postId', {
      postId: '@_id'});
  }

  // Comment factory
  function Comment($resource, BaseUrl) {
    return $resource(BaseUrl + '/comments/:commentId', {
      commentId: '@_id'});
  }

  // User factory
  function User ($resource, BaseUrl) {
    return $resource(BaseUrl + '/users/:userId',
      { userId: '@_id' }
    );


})();
