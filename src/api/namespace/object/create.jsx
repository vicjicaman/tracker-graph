import * as ObjectApi from 'Api/utils/object'

export const create = (parent, entity, transform, cxt) => {

  const obj = ObjectApi.create(parent, entity, transform, cxt);

  if (!obj) {
    return null;
  }

  return {
    ...obj,
    namespace: parent.namespace
      ? parent.namespace
      : parent
  };
}
