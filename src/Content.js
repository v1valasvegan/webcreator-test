import React from 'react';
import cn from 'classnames';
import { uniqueId } from 'lodash';

export default ({ props }) => {
  const { metadata: { components } } = props;
  return (<div className="container-fluid row">
    {components.map(({ col, metadata }) => {
      const classList = cn({ [`col-${col}`]: true });
      const innerHTML = { __html: metadata['text'] };
      return (
        <div className={classList} key={uniqueId()}>
          <h2>{metadata.title}</h2>
          <div className="wrapper" dangerouslySetInnerHTML={innerHTML}></div>
        </div>
      )
    })}
  </div>)
};
