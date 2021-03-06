// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

define([
  'app',
  'api',

  // Modules
  'addons/compaction/views',
  'addons/databases/resources',
  'addons/documents/shared-routes'
],

function(app, FauxtonAPI, Compaction, Databases, BaseRoute) {

  var CompactionRouteObject = BaseRoute.extend({
    routes: {
      "database/:database/compact": "compaction"
    },

    initialize: function (route, masterLayout, options) {
      var databaseName = options[0];
      this.database = this.database || new Databases.Model({ id: databaseName });
      this.allDatabases = new Databases.List();

      this.createDesignDocsCollection();
      this.addLeftHeader();
      this.addSidebar('docLink_compact');
    },

    compaction: function () {
      this.setView('#dashboard-content', new Compaction.Layout({model: this.database}));
    },

    establish: function () {
      return [
        this.designDocs.fetch({reset: true}),
        this.allDatabases.fetchOnce()
      ];
    }
  });

  Compaction.RouteObjects = [CompactionRouteObject];

  return Compaction;

});


