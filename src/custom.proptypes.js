export function atLeastOneRequired(checkProps) {
    return function(props, propName, compName) {
      const requiredPropNames = Object.keys(checkProps);
  
      const found = requiredPropNames.find((requiredProp) => props[requiredProp]);
      // console.log(requiredPropNames);
      try {
        if (!found) {
          throw new Error(
            `One of ${requiredPropNames.join(',')} is required by '${compName}' component.`,
          );
        }
        PropTypes.checkPropTypes(checkProps, props, propName, compName);
      } catch (e) {
        return e;
      }
      return null;
    };
  }