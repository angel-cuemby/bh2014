'use strict';

angular.module('comMotionApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
