import React from 'react';
import { Result, Button } from 'antd';
import { DownloadScreenLoadingProps } from './types';
import { Blocks } from "react-loader-spinner";
/**
 * Reloads the current page.
 *
 * @param {none} none - no parameters required
 * @return {void} no return value
 */
const DownloadScreenLoading: React.FC<DownloadScreenLoadingProps> = ({
   microserviceName,
   downloadUrl,
   loading,
   t,
}) => {

   /**
   * Reloads the current page.
   *
   * @param {none} none - no parameters required
   * @return {void} no return value
   */
   const handleReload = () => {
      window.location.reload();
   };

   return (
      <div className='centered-content'>
         { loading ? 
            <Blocks
               visible={true}
               height="80"
               width="80"
               ariaLabel="blocks-loading"
               wrapperStyle={{}}
               wrapperClass="blocks-wrapper"
            />
            :
            <Result
               status="warning"
               title={t("common.unavaible")}
               subTitle={t("module.notfound") + microserviceName }
               extra={
                  downloadUrl !== '' && (
                     <>
                        <p>{t('module.info.download')}</p>
                        <Button type="primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                           {t('module.download')}
                        </Button>
                        <Button type="default" onClick={handleReload}>
                           {t('common.reload.page')}
                        </Button>
                     </>
                  )}
            />
         }
      </div>
   );
};

export default DownloadScreenLoading;
