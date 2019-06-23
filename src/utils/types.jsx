import GraphQLToolsTypes from "graphql-tools-types"

const schema = [`
    scalar Void
    scalar MyInt
    scalar MyFloat
    scalar MyString
    scalar Date
    scalar UUID
    scalar JSON
    scalar Coord
`];


const resolvers = {
  Void: GraphQLToolsTypes.Void({name: "MyVoid"}),
  MyInt: GraphQLToolsTypes.Int({name: "MyInt", min: 0, max: 100}),
  MyFloat: GraphQLToolsTypes.Float({name: "MyFloat", min: 0.0, max: 100.0}),
  MyString: GraphQLToolsTypes.String({name: "MyString", regex: /^(?:foo|bar|quux)$/}),
  Date: GraphQLToolsTypes.Date({name: "MyDate"}),
  UUID: GraphQLToolsTypes.UUID({name: "MyUUID"}),
  JSON: GraphQLToolsTypes.JSON({name: "MyJSON"}),
  Coord: GraphQLToolsTypes.JSON({name: "Coord", struct: "{ x: number, y: number }"}),
}

export {
  schema,
  resolvers
};
