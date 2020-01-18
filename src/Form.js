import React from 'react';
import data from './data/page.json';
import cn from 'classnames';

const { form: { field_groups } } = data

const renderField = (field) => {
  const { name, type, label, required, group } = field;
  const divClassList = cn({
    'form-group': true,
    'col-md-6': group === 'main',
    [field_groups['additional']]: group === 'additional',
    'd-flex': group === 'additional',
    'flex-column': group === 'additional',
  });
  const inputClassList = cn({
    'form-control': true,
    'h-100': group === 'additional',
  });

  return (
    <div className={divClassList} key={name}>
        <label htmlFor={name}>{label}</label>
        <input type={type} className={inputClassList} id={name} required={required}/>
      </div>
    )
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
    const { fields, button } = this.props;
    const mainClassList = cn({ [field_groups['main']]: true });
    const mainGroup = fields.filter(({ group }) => group === 'main');
    const additional = fields.find(({ group }) => group === 'additional');
    const checkbox = fields.find(({ type }) => type === 'checkbox');
    const checkboxInnerHTML = { __html: checkbox['label'] };
    return (
      <form>
        <div className="form-row">
          <div className={mainClassList}>
            {renderMainGroup(mainGroup)}
          </div>
            {renderField(additional)}
        </div>
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={checkbox.name} defaultChecked />
          <label className="custom-control-label" htmlFor={checkbox.name} dangerouslySetInnerHTML={checkboxInnerHTML}></label>
        </div>
        <input className="btn btn-primary" type="submit" value={button.text}></input>
      </form>
    )
  }
};