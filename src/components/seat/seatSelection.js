import { Formik } from 'formik';
import * as Yup from 'yup';

import PrimaryButton from '../button/primaryButton';
import SecondaryButton from '../button/secondaryButton';
import InputWithLabel from '../form/inputWithLabel';
import SeatIcon from '../searchResults/SeatIcon';
import { removeElementFromArray } from '../../utils/arrayUtils';
import { useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';

const SeatSelectionSchema = Yup.object().shape({
  selectedSeats: Yup.array().min(1, 'Required'),
  boardingPoint: Yup.string().required('Required'),
  dropOffPoint: Yup.string().required('Required'),
});

const SeatSelection = ({
  handleSubmit,
  formType,
  setSeatSelection,
  schedule,
}) => {
  const topSeatsFirstRow = [4, 5, 12, 13, 20, 21, 28, 29, 36, 37, 44, 45];
  const topSeatsSecondRow = [3, 6, 11, 14, 19, 22, 27, 30, 35, 38, 43, 46];
  const bottomSeatsFirstRow = [2, 7, 10, 15, 18, 23, 26, 31, 34, 39, 42, 48];
  const bottomSeatsSecondRow = [1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 49];

  const [dropoffPoints, setDropOffPoints] = useState(null);
  const [boardingPoints, setBoardingPoints] = useState(null);

  useEffect(() => {
    let boardingPoints = [
      {
        label: '',
        value: '',
      },
    ];
    let dropOffPoints = [
      {
        label: '',
        value: '',
      },
    ];
    Promise.all(
      schedule?.boardingPoints?.map(boardingPoint => {
        boardingPoints.push({
          label: boardingPoint?.terminalName,
          value: boardingPoint?.scheduleLocationUUId,
        });
      }),
    ).then(() => {
      setBoardingPoints(boardingPoints);
    });

    Promise.all(
      schedule?.dropOffPoints?.map(dropOffPoint => {
        dropOffPoints.push({
          label: dropOffPoint?.terminalName,
          value: dropOffPoint?.scheduleLocationUUId,
        });
      }),
    ).then(() => {
      setDropOffPoints(dropOffPoints);
    });
  }, []);

  return (
    <div className="text-white">
      <Formik
        initialValues={{
          selectedSeats: [],
          boardingPoint: null,
          dropOffPoint: null,
        }}
        onSubmit={(values, { setFieldValue, setTouched }) => {
          console.log('values', values);

          setSeatSelection(values);
          handleSubmit();
          setFieldValue('selectedSeats', []);
          setFieldValue('boardingPoint', null);
          setFieldValue('dropOffPoint', null);
          setTouched({});
        }}
        validateOnBlur={false}
        validationSchema={SeatSelectionSchema}
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
            <form className="mx-4 flex divide-x divide-dashed">
              <div className="w-3/4 flex flex-col lg:flex-row justify-between py-6 divide-y lg:divide-x lg:divide-y-0 divide-dashed">
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

                <div className="w-7/8 h-full px-2 flex flex-row lg:flex-col justify-between">
                  <div className="h-full lg:h-1/4 w-full flex flex-col lg:flex-row justify-around">
                    {topSeatsFirstRow?.map(seatNum => {
                      if (schedule.reservedSeats?.indexOf(seatNum) !== -1) {
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
                        schedule.occupiedSeats &&
                        schedule.occupiedSeats.length > 0 &&
                        schedule.occupiedSeats?.indexOf(seatNum) !== -1
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
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="h-full lg:h-1/4 w-full flex flex-col lg:flex-row justify-around">
                    {topSeatsSecondRow?.map(seatNum => {
                      if (schedule.reservedSeats?.indexOf(seatNum) !== -1) {
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
                        schedule.occupiedSeats &&
                        schedule.occupiedSeats.length > 0 &&
                        schedule.occupiedSeats?.indexOf(seatNum) !== -1
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
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="h-full lg:h-1/4 w-full flex flex-col lg:flex-row justify-end items-center ">
                    {schedule.reservedSeats?.indexOf('47') !== -1 ? (
                      <SeatIcon
                        seatNumber={'47'}
                        setSeat={num => {
                          let selectedSeats = values.selectedSeats;
                          selectedSeats.push(num);
                          setFieldValue('selectedSeats', selectedSeats);
                        }}
                        seatType="reserved"
                      />
                    ) : schedule.occupiedSeats &&
                      schedule.occupiedSeats.length > 0 &&
                      schedule.occupiedSeats?.indexOf('47') !== -1 ? (
                      <SeatIcon
                        seatNumber={'47'}
                        setSeat={num => {
                          let selectedSeats = values.selectedSeats;
                          selectedSeats.push(num);
                          setFieldValue('selectedSeats', selectedSeats);
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
                        }}
                        seatType="available"
                      />
                    )}
                  </div>
                  <div className="h-full lg:h-1/4 w-full flex flex-col lg:flex-row justify-around">
                    {bottomSeatsFirstRow?.map(seatNum => {
                      if (schedule.reservedSeats?.indexOf(seatNum) !== -1) {
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
                            }}
                          />
                        );
                      } else if (
                        schedule.occupiedSeats &&
                        schedule.occupiedSeats.length > 0 &&
                        schedule.occupiedSeats?.indexOf(seatNum) !== -1
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
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="h-full lg:h-1/4 w-full flex flex-col lg:flex-row flex justify-around">
                    {bottomSeatsSecondRow?.map(seatNum => {
                      if (schedule.reservedSeats?.indexOf(seatNum) !== -1) {
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
                            }}
                          />
                        );
                      } else if (
                        schedule.occupiedSeats &&
                        schedule.occupiedSeats.length > 0 &&
                        schedule.occupiedSeats?.indexOf(seatNum) !== -1
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
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="h-1/4 w-2/3 mx-auto grid grid-cols-4 gap-3 items-end">
                    <div>
                      <img alt="" src="img/Legend 01.png" height={20} />
                    </div>
                    <div>
                      <img alt="" src="img/Legend 02.png" height={20} />
                    </div>
                    <div>
                      <img alt="" src="img/Legend 03.png" height={20} />
                    </div>
                    <div>
                      <img alt="" src="img/Legend 04.png" height={20} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 bg-[#696868] flex flex-col px-3">
                {formType === 'main' ? (
                  <div className="text-1xl font-bold text-[#FF6B1B] border-bottom pb-2">
                    Main Seat Selection
                  </div>
                ) : (
                  <div className="text-1xl font-bold text-[#FF6B1B] border-bottom pb-2">
                    Return Seat Selection
                  </div>
                )}
                <div className="my-1">
                  <InputWithLabel
                    labelText={'Selected Seats'}
                    name="selectedSeats"
                    value={`${values?.selectedSeats?.map(seat => seat + ' ')}`}
                    error={errors.selectedSeats}
                    touched={touched.selectedSeats}
                  />
                </div>
                <div className="my-1">
                  <InputWithLabel
                    labelText={'Price'}
                    inputLabel="price"
                    name="price"
                    value={`${
                      values?.selectedSeats.length * schedule?.tariff?.amount
                    } (${values?.selectedSeats.length} * ${
                      schedule?.tariff?.amount
                    }) ETB`}
                  />
                </div>
                <div className="my-1">
                  <Select
                    fullWidth
                    inputLabel={'select boarding point'}
                    label={'Select Boarding Point'}
                    name={'boardingPoint'}
                    transparent
                    onChange={handleChange}
                    smallError={true}
                    value={values.boardingPoint}
                    error={errors.boardingPoint}
                    touched={touched.boardingPoint}
                  >
                    {[
                      {
                        label: '',
                        value: '',
                      },
                      {
                        label: 'Mojo',
                        value: 'Mojo',
                      },
                      {
                        label: 'Akaki',
                        value: 'Legehar',
                      },
                    ].map((option, index) => (
                      <MenuItem
                        key={index}
                        value={option.value}
                        selected={values.dropOffPoint === option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="my-1">
                  <Select
                    fullWidth
                    inputLabel={'select drop-off point'}
                    label={'Select Drop-Off Point'}
                    name={'dropOffPoint'}
                    // onChange={handleChange}
                    // value={values.dropOffPoint}
                    // error={errors.dropOffPoint}
                    // touched={touched.dropOffPoint}
                  >
                    {[
                      {
                        label: '',
                        value: '',
                      },
                      {
                        label: 'Mojo',
                        value: 'Mojo',
                      },
                      {
                        label: 'Akaki',
                        value: 'Legehar',
                      },
                    ].map((option, index) => (
                      <MenuItem
                        key={index}
                        value={option.value}
                        selected={values.dropOffPoint === option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                {formType === 'main' && (
                  <div class="flex items-start my-1">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        class="w-4 h-4 border bg-transparent border-[#ff6b1b] focus:ring-3 focus:ring-[#ff6b1b] "
                        checked={values.remember}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" class=" text-xs">
                        I agree to the Term and Condition
                      </label>
                    </div>
                  </div>
                )}
                <div className="my-2">
                  {Object.keys(errors).length <= 0 ? (
                    <PrimaryButton
                      label={'Proceed to checkout'}
                      onClick={handleSubmit}
                      className="w-full font-bold rounded-none"
                    />
                  ) : (
                    <SecondaryButton
                      label={'Proceed to checkout'}
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

export default SeatSelection;
