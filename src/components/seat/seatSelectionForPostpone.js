import { Formik } from 'formik';
import * as Yup from 'yup';

import PrimaryButton from '../button/primaryButton';
import SecondaryButton from '../button/secondaryButton';
import InputWithLabel from '../form/inputWithLabel';
import Select from '../form/select';
import SeatIcon from '../searchResults/SeatIcon';
import { removeElementFromArray } from '../../utils/arrayUtils';

const SeatSelectionForPostponeSchema = Yup.object().shape({
  boardingPoint: Yup.string().required('Required'),
  dropOffPoint: Yup.string().required('Required'),
});

const SeatSelectionForPostpone = ({
  handleSubmit,
  reservedSeats,
  occupiedSeats,
  price,
}) => {
  const topSeats = [
    4, 5, 12, 13, 20, 21, 28, 29, 36, 37, 44, 45, 3, 6, 11, 14, 19, 22, 27, 30,
    35, 38, 43, 46,
  ];
  const bottomSeats = [
    2, 7, 10, 15, 18, 23, 26, 31, 34, 39, 42, 48, 1, 8, 9, 16, 17, 24, 25, 32,
    33, 40, 41, 49,
  ];

  return (
    <div className="text-white">
      <Formik
        initialValues={{
          selectedSeats: [],
          reservedSeats: reservedSeats,
          occupiedSeats: occupiedSeats,
          totalPrice: 0,
          price: price,
          boardingPoint: null,
          dropOffPoint: null,
        }}
        onSubmit={(values, { setFieldValue, setTouched }) => {
          handleSubmit(values);
          setFieldValue('selectedSeats', []);
          setFieldValue('price', price);
          setFieldValue('totalPrice', 0);
          setFieldValue('boardingPoint', null);
          setFieldValue('dropOffPoint', null);
          setTouched({});
        }}
        validateOnBlur={false}
        validationSchema={SeatSelectionForPostponeSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <form className=" flex divide-x divide-dashed">
              <div className="w-3/4 bg-[#696868] flex justify-between py-6 divide-x divide-dashed">
                <div className="w-1/8 bg-grey-50 px-2 h-full flex">
                  <div className="h-full flex flex-col justify-between">
                    <div
                      style={{
                        height: '10px',
                        width: '10px',
                      }}
                    >
                      <SeatIcon
                        seatNumber={(0o0).toLocaleString('en-US', {
                          minimumIntegerDigits: 2,
                          useGrouping: false,
                        })}
                        seatType="reserved"
                      />
                    </div>
                    <img alt="steering wheel" src="/img/steering-wheel.png" />
                  </div>
                </div>
                <div className="w-7/8 h-full px-2 flex flex-col justify-between">
                  <div className="h-1/4 w-full flex flex-wrap justify-around">
                    {topSeats?.map(seatNum => {
                      if (values.reservedSeats?.indexOf(seatNum) !== -1) {
                        return (
                          <SeatIcon
                            seatNumber={seatNum.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                            seatType="reserved"
                          />
                        );
                      } else if (
                        values?.occupiedSeats?.indexOf(seatNum) !== -1
                      ) {
                        return (
                          <SeatIcon
                            seatNumber={seatNum.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                            seatType="occupied"
                          />
                        );
                      } else if (
                        values?.selectedSeats?.indexOf(
                          JSON.stringify(seatNum),
                        ) !== -1
                      ) {
                        return (
                          <SeatIcon
                            seatNumber={seatNum.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                            seatType="selected"
                            setSeat={num => {
                              let selectedSeats = values.selectedSeats;
                              const itemIndex =
                                values.selectedSeats.indexOf(num);
                              selectedSeats = removeElementFromArray(
                                selectedSeats,
                                itemIndex,
                              );
                              setFieldValue('selectedSeats', selectedSeats);
                              setFieldValue(
                                'totalPrice',
                                selectedSeats.length * price,
                              );
                            }}
                          />
                        );
                      } else {
                        return (
                          <SeatIcon
                            seatNumber={seatNum.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                            seatType="available"
                            setSeat={num => {
                              let selectedSeats = values.selectedSeats;
                              selectedSeats.push(num);
                              setFieldValue('selectedSeats', selectedSeats);
                              setFieldValue(
                                'totalPrice',
                                selectedSeats.length * price,
                              );
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="h-1/4 w-full flex justify-end items-center ">
                    {values.reservedSeats?.indexOf('47') !== -1 ? (
                      <SeatIcon
                        seatNumber={'47'}
                        setSeat={num => {
                          let selectedSeats = values.selectedSeats;
                          selectedSeats.push(num);
                          setFieldValue('selectedSeats', selectedSeats);
                          setFieldValue(
                            'totalPrice',
                            selectedSeats.length * price,
                          );
                        }}
                        seatType="reserved"
                      />
                    ) : values?.occupiedSeats?.indexOf('47') !== -1 ? (
                      <SeatIcon
                        seatNumber={'47'}
                        setSeat={num => {
                          let selectedSeats = values.selectedSeats;
                          selectedSeats.push(num);
                          setFieldValue('selectedSeats', selectedSeats);
                          setFieldValue(
                            'totalPrice',
                            selectedSeats.length * price,
                          );
                        }}
                        seatType="occupied"
                      />
                    ) : values.selectedSeats?.indexOf('47') !== -1 ? (
                      <SeatIcon
                        seatNumber={'47'}
                        setSeat={num => {
                          let selectedSeats = values.selectedSeats;
                          const itemIndex = values.selectedSeats.indexOf(num);
                          selectedSeats = removeElementFromArray(
                            selectedSeats,
                            itemIndex,
                          );
                          setFieldValue('selectedSeats', selectedSeats);
                          setFieldValue(
                            'totalPrice',
                            selectedSeats.length * price,
                          );
                        }}
                        seatType="selected"
                      />
                    ) : (
                      <SeatIcon
                        seatNumber={'47'}
                        setSeat={num => {
                          let selectedSeats = values.selectedSeats;
                          selectedSeats.push(num);
                          setFieldValue('selectedSeats', selectedSeats);
                          setFieldValue(
                            'totalPrice',
                            selectedSeats.length * price,
                          );
                        }}
                        seatType="available"
                      />
                    )}
                  </div>
                  <div className="h-1/4 w-full flex flex-wrap justify-around">
                    {bottomSeats?.map(seatNum => {
                      if (values.reservedSeats?.indexOf(seatNum) !== -1) {
                        return (
                          <SeatIcon
                            seatNumber={seatNum.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                            seatType="reserved"
                            setSeat={num => {
                              let selectedSeats = values.selectedSeats;
                              selectedSeats.push(num);
                              setFieldValue('selectedSeats', selectedSeats);
                              setFieldValue(
                                'totalPrice',
                                selectedSeats.length * price,
                              );
                            }}
                          />
                        );
                      } else if (
                        values?.occupiedSeats?.indexOf(seatNum) !== -1
                      ) {
                        return (
                          <SeatIcon
                            seatNumber={seatNum.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                            seatType="occupied"
                            setSeat={num => {
                              let selectedSeats = values.selectedSeats;
                              selectedSeats.push(num);
                              setFieldValue('selectedSeats', selectedSeats);
                              setFieldValue(
                                'totalPrice',
                                selectedSeats.length * price,
                              );
                            }}
                          />
                        );
                      } else if (
                        values?.selectedSeats?.indexOf(
                          JSON.stringify(seatNum),
                        ) !== -1
                      ) {
                        return (
                          <SeatIcon
                            seatNumber={seatNum.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                            seatType="selected"
                            setSeat={num => {
                              let selectedSeats = values.selectedSeats;
                              const itemIndex =
                                values.selectedSeats.indexOf(num);
                              selectedSeats = removeElementFromArray(
                                selectedSeats,
                                itemIndex,
                              );
                              setFieldValue('selectedSeats', selectedSeats);
                              setFieldValue(
                                'totalPrice',
                                selectedSeats.length * price,
                              );
                            }}
                          />
                        );
                      } else {
                        return (
                          <SeatIcon
                            seatNumber={seatNum.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                            seatType="available"
                            setSeat={num => {
                              let selectedSeats = values.selectedSeats;
                              selectedSeats.push(num);
                              setFieldValue('selectedSeats', selectedSeats);
                              setFieldValue(
                                'totalPrice',
                                selectedSeats.length * price,
                              );
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="h-1/4 w-2/3 mx-auto grid grid-cols-4 gap-3 items-end">
                    <div>
                      <img
                        alt="legend 01"
                        src="img/Legend 01.png"
                        height={20}
                      />
                    </div>
                    <div>
                      <img
                        alt="legend 02"
                        src="img/Legend 02.png"
                        height={20}
                      />
                    </div>
                    <div>
                      <img
                        alt="legend 03"
                        src="img/Legend 03.png"
                        height={20}
                      />
                    </div>
                    <div>
                      <img
                        alt="legend 04"
                        src="img/Legend 04.png"
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 bg-[#696868] flex flex-col px-3">
                <div className="my-1">
                  <InputWithLabel
                    labelText={'Selected Seats'}
                    name="selectedSeats"
                    value={`${values.selectedSeats?.map(seat => seat + ' ')}`}
                    error={errors.selectedSeats}
                    touched={touched.selectedSeats}
                  />
                </div>
                <div className="my-1">
                  <InputWithLabel
                    labelText={'Tariff'}
                    inputLabel="Tariff"
                    name="price"
                    value={`${values.totalPrice} (${values.selectedSeats.length} * ${values.price}) birr`}
                    error={errors.price}
                    touched={touched.price}
                  />
                </div>
                <div className="my-1">
                  <Select
                    inputLabel={'select boarding point'}
                    label={'Select Boarding Point'}
                    name={'boardingPoint'}
                    transparent
                    onChange={handleChange}
                    smallError={true}
                    options={[
                      {
                        value: '',
                        label: '',
                      },
                      {
                        value: 'Meskel Square, Addis Ababa',
                        label: 'Meskel Square, Addis Ababa',
                      },
                      {
                        value: 'Kality, Addis Ababa',
                        label: 'Kality, Addis Ababa',
                      },
                      {
                        value: 'Autobis Tera, Addis Ababa',
                        label: 'Autobis Tera, Addis Ababa',
                      },
                      {
                        value: 'Asko, Addis Ababa',
                        label: 'Asko, Addis Ababa',
                      },
                    ]}
                    value={values.boardingPoint}
                    error={errors.boardingPoint}
                    touched={touched.boardingPoint}
                  />
                </div>
                <div className="my-1">
                  <Select
                    inputLabel={'select drop-off point'}
                    label={'Select Drop-Off Point'}
                    name={'dropOffPoint'}
                    onChange={handleChange}
                    transparent
                    options={[
                      { value: '', label: '' },
                      { value: 'Mojo Bus Station', label: 'Mojo Bus Station' },
                      { value: 'Adama Station', label: 'Adama Station' },
                      {
                        value: 'Bahir Dar Station',
                        label: 'Bahir Dar Station',
                      },
                      { value: 'Mekele Station', label: 'Mekele Station' },
                    ]}
                    smallError={true}
                    value={values.dropOffPoint}
                    error={errors.dropOffPoint}
                    touched={touched.dropOffPoint}
                  />
                </div>
                <div className="my-2">
                  {Object.keys(errors).length === 0 &&
                  values.boardingPoint !== null ? (
                    <PrimaryButton
                      label={'Postpone'}
                      onClick={handleSubmit}
                      className="w-full font-bold rounded-none"
                    />
                  ) : (
                    <SecondaryButton
                      label={'Postpone'}
                      onClick={() => {}}
                      className="w-full font-bold rounded-none"
                    />
                  )}
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SeatSelectionForPostpone;
