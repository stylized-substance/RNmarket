import { useFormikContext, FormikErrors } from 'formik';
import { useEffect } from 'react';
import { ProductFilterState } from '#src/types';

// Product filter price fields are wrapped in this component so the field values can be set programmatically with useEffect
const PriceFieldWrapper = ({ children }: { children: React.ReactNode }) => {
  const {
    values,
    setFieldValue
  }: {
    values: ProductFilterState;
    setFieldValue: (
      field: string,
      value: React.SetStateAction<ProductFilterState[keyof ProductFilterState]>,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<ProductFilterState>>;
  } = useFormikContext<ProductFilterState>();

  useEffect(() => {
    const setPrice = async () => {
      if (values.lowestPrice && values.highestPrice) {
        if (values.lowestPrice > values.highestPrice) {
          await setFieldValue('lowestPrice', values.highestPrice, false);
        } else if (values.highestPrice < values.lowestPrice) {
          await setFieldValue('highestPrice', values.lowestPrice, false);
        }
      }
    };

    void setPrice();
  }, [values.lowestPrice, values.highestPrice, setFieldValue]);

  return <>{children}</>;
};

export default PriceFieldWrapper;
