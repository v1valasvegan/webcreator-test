import React from 'react';
import styles from './App.module.css';
import data from './data/page.json';
import Form from './Form';
import Content from './Content';
import Gallery from './Gallery';

function App() {
  const { components, form } = data;
  const gridComponent = components.find(({ type }) => type === 'GridComponent');
  const gallery = data.components.find(({ type }) => type === 'GalleryComponent');
  const { metadata: { images, title, slidesPerView } } = gallery;

  return (
    <div className={`${styles.app} container-fluid`}>
        <header className={styles.header}>Тест</header>
        <main className={styles.main}>
          <Gallery images={images} title={title} slidesPerView={slidesPerView} />
          <Content props={gridComponent} />
          <Form fields={form.fields} button={form.submit_button} title={form.title} />
        </main>
        <footer className={styles.footer}></footer>
    </div>
  );
}

export default App;
