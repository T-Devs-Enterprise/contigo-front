import React from "react";
import ConfigureFarm from "../../../components/ConfigureFarm";

function RegisterFarm({ farmId }) {
  // eslint-disable-next-line no-unused-vars
  const registerFarm = (values) => {
    const phoneFormat =
      values.phoneNumber === "+"
        ? values.phoneNumber.replace("+", "")
        : values.phoneNumber;
    const inoutValues = {
      name: values.name,
      landLord: values.owner,
      country: values.country,
      region: values.region,
      district: values.district,
      address: values.address,
      phoneNumber: phoneFormat,
      nit: values.ruc,
      areaUnit: values.areaUnit,
      weightUnit: values.weightUnit,
      capacityUnit: values.capacityUnit,
      currency: values.coin,
    };

    if (farmId) {
      inoutValues.id = farmId;
    }

    //addFarm({
    //  variables: {
    //    input: {
    //      ...inoutValues
    //    }
    //  }
    //}).then(({data}) => {
    //  const {errors, id} = data.createFarm;
    //  if (!errors) {
    //    const coinAbbr = coinOptions.filter(coin => coin.id === parseInt(values.coin, 10));

    //    setCurrency(coinAbbr[0].name);
    //    setRegisterStep(1);
    //    setFarmId(id);
    //  } else {
    //    setErrors([{
    //      name: 'phoneNumber',
    //      message: errors[0].messages[0]
    //    }]);
    //  }
    //});
  };

  return <ConfigureFarm />;
}

export default RegisterFarm;
