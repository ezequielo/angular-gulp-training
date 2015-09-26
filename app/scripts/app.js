(function(){
  'use strict';

  angular
    .module('blog', ['ngRoute', 'blog.controllers', 'blog.services'])
    .config(config);

  // routes post list, post detail, new
  function config($locationProvider, $routeProvider){
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/post-list.tpl.html',
        controller: 'PostListController',
        controllerAs: 'postlist'
      })
      .when('/post/:PostId', {
        templateUrl: 'views/post-detail.tpl.html',
        controller: 'PostDetailController',
        controllerAs: 'postdetail'
      })
      .when('/new', {
        templateUrl: 'views/post-create.tpl.html',
        controller: 'PostCreateController',
        controllerAs: 'postcreate'
      });
  }

})();
