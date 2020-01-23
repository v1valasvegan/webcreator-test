/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';
import styles from './Form.module.css';
import data from './data/page.json';

const { form: { field_groups: fieldGroups } } = data;

const renderField = (field) => {
  const {
    name, type, label, required, group,
  } = field;
  const divClassList = cn({
    'form-group': true,
    'col-md-6': group === 'main',
    [fieldGroups.additional]: group === 'additional',
    'd-flex': group === 'additional',
    'flex-column': group === 'additional',
  });
  const inputClassList = cn({
    'form-control': true,
    [styles['form-control']]: true,
    'h-100': group === 'additional',
  });

  return (
    <div className={divClassList} key={name}>
        <label htmlFor={name}>{label}</label>
        <input type={type} className={inputClassList} id={name} required={required} placeholder=""/>
      </div>
  );
};

const renderMainGroup = (fields) => {
  const [first, second, ...rest] = fields;
  const row = <div className="form-row">
      {renderField(first)}
      {second && renderField(second)}
    </div>;

  if (rest.length === 0) {
    return row;
  }
  return <>{row}{renderMainGroup(rest)}</>;
};

export default class Form extends React.Component {
  render() {
    const { fields, button, title } = this.props;
    const mainClassList = cn({ [fieldGroups.main]: true });
    const mainGroup = fields.filter(({ group }) => group === 'main');
    const additional = fields.find(({ group }) => group === 'additional');
    const checkbox = fields.find(({ type }) => type === 'checkbox');
    const checkboxInnerHTML = { __html: checkbox.label };
    const customControlClassName = `custom-control custom-checkbox ${styles['mb-20']}`;
    const formClassNames = `container-fluid ${styles['mb-64']}`;
    return (
        <form className={formClassNames}>
          <h2 className={styles.heading}>{title}</h2>
          <div className="form-row">
            <div className={mainClassList}>
              {renderMainGroup(mainGroup)}
            </div>
              {renderField(additional)}
          </div>
          <div className={customControlClassName}>
            <input type="checkbox" className="custom-control-input" id={checkbox.name} defaultChecked />
            <label className="custom-control-label" htmlFor={checkbox.name} dangerouslySetInnerHTML={checkboxInnerHTML}></label>
          </div>
          <input className={`btn ${styles.button}`} type="submit" value={button.text}></input>
        </form>
    );
  }
}
