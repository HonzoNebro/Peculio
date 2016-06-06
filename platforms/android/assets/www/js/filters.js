var filters = angular.module('starterFilters', [])

filters.filter("fromTimestamp", function(){
  return function(timestamp, format){
    return moment.unix(timestamp).format(format)
  }
});