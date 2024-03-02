import React from 'react';
import styles from './index.module.scss';
import AdsList from '../components/AdsList';

function Index() {
  return (
    <div className={styles.container}>
      <AdsList />
    </div>
  );
}

export default Index;
