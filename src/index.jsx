require('dotenv').config();
import _ from "lodash";
import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import {
  makeExecutableSchema
} from 'graphql-tools';
import {
  createNode
} from "@nebulario/tracker-node";

import cors from 'cors';

import {
  schema as ViewerSchema,
  resolvers as ViewerResolvers
} from './schema/viewer';

import * as Cache from 'Utils/cache'
import {
  getRootPaths
} from 'Api/utils/path'
import * as GitApi from '@nebulario/tracker-git';
import * as EventApi from '@nebulario/tracker-events';
import * as PingApi from '@nebulario/tracker-ping';

import * as Utils from './utils';
import * as Exception from './utils/exception';
import {
  schema as TypesSchema,
  resolvers as TypesResolvers
} from './utils/types';

global._ = _;
global.FlowError = Exception.FlowError;

(async () => {

  const name = "repoflow-graph";
  const service_port = (process.argv[2] || process.env.DEV_TRACKER_GRAPH_SERVICE_PORT || process.env.TRACKER_GRAPH_SERVICE_PORT || 4000);
  const workspace = path.resolve(process.env.DEV_TRACKER_WORKSPACE || process.env.TRACKER_WORKSPACE);

  console.log('WORKSPACE: ' + workspace);
  console.log(process.cwd());

  const mode = process.argv[3];
  const logPath = mode !== "schema" ?
    path.join(workspace, 'logs', name) :
    null;


  const cxt = {
    workspace,
    url: {
      local: "http://localhost:" + service_port + "/graphql"
    },
    root: {
      id: "root",
      paths: getRootPaths(workspace)
    }
  }

  const app = createNode({
    name
  }, cxt);


  const GraphSchema = `

          type Query {
            viewer: Viewer
          }

          type Mutation {
            viewer (config: JSON!): ViewerMutations
          }
         `;

  const GraphResolver = {
    Query: {
      viewer: (parent, args, cxt) => {
        cxt.type = "query";
        return {
          id: '1000',
          name: "local"
        };
      }
    },
    Mutation: {
      viewer: (parent, {
        config
      }, cxt) => {
        cxt.type = "mutation";
        cxt.operationConfig = config;
        return {
          id: '1000',
          name: "local"
        };
      }
    }
  };

  const schema = makeExecutableSchema({
    typeDefs: [
      ...TypesSchema,
      ...ViewerSchema,
      GraphSchema
    ],
    resolvers: _.merge(TypesResolvers, ViewerResolvers, GraphResolver)
  });

  app.use(cors());



  const graphqlHandler = (req, res, next) => {
    const graphqlHTTPHandler = graphqlHTTP({
      schema: schema,
      context: {
        ...cxt,
        req,
        exeid: req.id
      },
      graphiql: true
    });
    graphqlHTTPHandler(req, res).then(() => {
      const exeid = req.id;
      GitApi.Exec.clearExecutionCache(exeid);
      Cache.clearHash(exeid);
      next();
    }).catch((e) => {
      const exeid = req.id;
      GitApi.Exec.clearExecutionCache(exeid);
      Cache.clearHash(exeid);
      next(e);
    });
  };

  EventApi.routes(app);

  app.get('/graphql', graphqlHandler);
  app.post('/graphql', graphqlHandler);

  app.use(function(req, res, next) {
    next();
  });

  PingApi.loop(cxt);
  app.listen(service_port);
  console.log('Running at ' + service_port);

})().catch(e => {
  console.log('Exception ' + e.toString());
  throw e;
});
