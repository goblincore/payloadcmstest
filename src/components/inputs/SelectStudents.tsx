import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Label  from 'payload/dist/admin/components/forms/Label';
import Error from 'payload/dist/admin/components/forms/Error';
import FileDetails from 'payload/dist/admin/components/elements/FileDetails';
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription';
import { FilterOptions, UploadField } from 'payload/dist/fields/config/types';
import { Description } from 'payload/dist/admin/components/forms/FieldDescription/types';
import { FieldTypes } from 'payload/dist/admin/components/forms/field-types';
import { SanitizedCollectionConfig } from 'payload/dist/collections/config/types';

import Students from '../../collections/Students';
import { useListDrawer } from 'payload/dist/admin/components/elements/ListDrawer';
import Button from 'payload/dist/admin/components/elements/Button';

import { ListDrawerProps } from 'payload/dist/admin/components/elements/ListDrawer/types';
import { GetFilterOptions } from 'payload/dist/admin/components/utilities/GetFilterOptions';
import { FilterOptionsResult } from 'payload/dist/admin/components/forms/field-types/Relationship/types';

// import './index.scss';

const baseClass = 'upload';

export type SelectStudentsInputProps = Omit<UploadField, 'type'> & {
  showError?: boolean
  errorMessage?: string
  readOnly?: boolean
  path: string
  required?: boolean
  value?: string
  description?: Description
  onChange?: (e) => void
  placeholder?: string
  style?: React.CSSProperties
  className?: string
  width?: string
  fieldTypes?: FieldTypes
  collection?: SanitizedCollectionConfig
  serverURL?: string
  api?: string
  filterOptions: FilterOptions
}

const SelectStudents: React.FC<SelectStudentsInputProps> = (props) => {
  const {
    path,
    required,
    readOnly,
    style,
    className,
    width,
    description,
    label,
    relationTo,
    value,
    onChange,
    showError,
    serverURL = 'http://localhost:3000',
    api = '/api',
    collection = Students,
    errorMessage,
    filterOptions,
  } = props;

  console.log('///PROPS', props);

  const { t, i18n } = useTranslation('fields');

  const [file, setFile] = useState(undefined);
  const [missingFile, setMissingFile] = useState(false);
  const [collectionSlugs] = useState([collection?.slug]);
  const [filterOptionsResult, setFilterOptionsResult] = useState<FilterOptionsResult>();


  const [
    ListDrawer,
    ListDrawerToggler,
    {
      closeDrawer: closeListDrawer,
    },
  ] = useListDrawer({
    collectionSlugs,
    filterOptions: filterOptionsResult,
  });

  const classes = [
    'field-type',
    baseClass,
    className,
    showError && 'error',
    readOnly && 'read-only',
  ].filter(Boolean).join(' ');

  useEffect(() => {
    if (typeof value === 'string' && value !== '') {
      const fetchFile = async () => {
        const response = await fetch(`${serverURL}${api}/${relationTo}/${value}`, {
          credentials: 'include',
          headers: {
            'Accept-Language': i18n.language,
          },
        });
        if (response.ok) {
          const json = await response.json();
          setFile(json);
        } else {
          setMissingFile(true);
          setFile(undefined);
        }
      };

      fetchFile();
    } else {
      setFile(undefined);
    }
  }, [
    value,
    relationTo,
    api,
    serverURL,
    i18n,
  ]);




  const onSelect = useCallback<ListDrawerProps['onSelect']>((args) => {
    setMissingFile(false);
    onChange({
      id: args.docID,
    });
    closeListDrawer();
  }, [onChange, closeListDrawer]);

  return (
    <div
      className={classes}
      style={{
        ...style,
        width,
      }}
    >
      <GetFilterOptions
        {...{
          filterOptionsResult,
          setFilterOptionsResult,
          filterOptions,
          path,
          relationTo,
        }}
      />
      <Error
        showError={showError}
        message={errorMessage}
      />
      <Label
        htmlFor={`field-${path.replace(/\./gi, '__')}`}
        label={label}
        required={required}
      />
   
        <React.Fragment>
        
       
            <div className={`${baseClass}__wrap`}>
              <div className={`${baseClass}__buttons`}>
              
                <ListDrawerToggler
                  className={`${baseClass}__toggler`}
                  disabled={readOnly}
                >
                  <Button
                    buttonStyle="secondary"
                    el="div"
                    disabled={readOnly}
                  >
                    {t('chooseFromExisting')}
                  </Button>
                </ListDrawerToggler>
              </div>
            </div>
     
          <FieldDescription
            value={file}
            description={description}
          />
        </React.Fragment>
    
   
      {!readOnly && <ListDrawer onSelect={onSelect} />}
    </div>
  );
};

export default SelectStudents