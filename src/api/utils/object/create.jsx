export const create = (parent, entity, transform, cxt) => {

  if (!entity || !entity.haveFile) {
    return null;
  }

  return {
    ...transform
      ? transform(entity, parent)
      : entity,
    parent,
    entity
  };
}
