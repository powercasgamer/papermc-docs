import React from 'react';
import clsx from 'clsx';
import EditThisPage from '@theme/EditThisPage';
import type {Props} from '@theme/EditMetaRow';

import LastUpdated from '@theme/LastUpdated';
import styles from './styles.module.css';

export default function EditMetaRow({
  className,
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  lastUpdatedCommit,
}: Props): JSX.Element {
  return (
    <div className={clsx('row', className)}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>
      <div className={clsx('col', styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy || lastUpdatedCommit) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
            lastUpdatedCommit={lastUpdatedCommit}
          />
        )}
      </div>
    </div>
  );
}
