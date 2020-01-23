/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';
import { uniqueId } from 'lodash';
import styles from './Content.module.css';

export default ({ props }) => {
  const { metadata: { components } } = props;
  const containerClassNames = `container-fluid ${styles['mb-20']}`;
  return (<div className={containerClassNames}>
    <div className="row">
      {components.map(({ col, metadata }) => {
        const classList = cn({ [`col-${col}`]: true });
        const innerHTML = { __html: metadata.text };
        return (
          <div className={classList} key={uniqueId()}>
            <h3 className={styles.heading}>{metadata.title}</h3>
            <div className="wrapper" dangerouslySetInnerHTML={innerHTML}></div>
          </div>
        );
      })}
    </div>
  </div>);
};
