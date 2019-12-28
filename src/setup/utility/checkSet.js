//  testing the entity is exist
export const isSet = (entity) => typeof entity !== "undefined";
export const isNotSet = (entity) => !isSet(entity);