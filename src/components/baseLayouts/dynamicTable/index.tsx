import React, { useState, useEffect } from 'react';
import { Table, Card } from 'antd';
import { tableStyle } from './constants';
import type { DynamicTableProps } from './types';
import HeaderPageProps from '../../layout/headerPage';
import { Action } from '../../baseComponents/bulkActionsDropdown/types';
import { useTranslation } from 'react-i18next';

/**
 * Render a custom table component.
 *
 * @param {DynamicTableProps<T>} { pageTitle, dataSource, columns, title, footer, bulkAction } - The props for the custom table component.
 * @return {JSX.Element} The rendered custom table component.
 */
const DynamicTable = <T extends object>({ pageTitle,  dataSource, columns, title, footer, deleteAction, openModalAction, customOptions = [], rowSelectionBoolean = false, showBulkActionOptions = true }: DynamicTableProps<T>) => {

   const { t } = useTranslation();

   const [buttonEnabled, setButtonEnabled] = useState(true);
   const [selectedRowKeys, setSelectedRowKeys] = useState<T[]>([]);

   const rowSelectionFunction = {
      /**
     * Handles the onChange event of the component.
     *
     * @param {React.Key[]} keys - The selected keys.
     * @param {T[]} selectedRows - The selected rows.
     */
      onChange: (keys: React.Key[], selectedRows: T[]) => {
         setSelectedRowKeys(selectedRows);
      },
   };

   const deleteAll = () => {
      if (deleteAction)
         deleteAction(selectedRowKeys);
   };

   useEffect(() => {
      selectedRowKeys.length > 0 ? setButtonEnabled(true) : setButtonEnabled(false);
   }, [selectedRowKeys]);


   const bulkActionOptions: Action[] = [
      ...customOptions,
      {
         name: t("common.add"),
         handler: openModalAction,
         type: "primary",
         activeAction: true
      },
      {
         name: t("common.delete.select"),
         handler: deleteAll,
         confirmMessage: t('common.delete.confirmation.multiple'),
         type: "danger",
         activeAction: buttonEnabled
      },
   ];

   const rowSelection: any = {
      type: 'checkbox',
      ...rowSelectionFunction,
   }

   return (
      <Card>
         <HeaderPageProps title={pageTitle} bulkActions={bulkActionOptions} showBulkActionOptions={showBulkActionOptions}>
            <Table
               className="top1 alltables75 stayBottom"
               dataSource={dataSource}
               columns={columns}
               size="small"
               pagination={false}
               style={tableStyle}
               bordered
               title={title}
               footer={footer}
               rowSelection={ rowSelectionBoolean ? rowSelection : null }
            />
         </HeaderPageProps>
      </Card>
   );
};

export default DynamicTable;
