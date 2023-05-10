import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import s from './sc.module.scss';
import { LoadingButton } from '@mui/lab';
import SeatSelection from './SeatSelection';
import { useAppContext } from '../../../../components/context/AppContext';
import ScheduleCardHeader from '../../../../components/card/ScheduleCardHeader';
import { BookingStepFormValue } from '../../types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { StoreType } from '../../../../redux/store';

const ScheduleCard = ({ schedule, loading = false, seatSelectionType }) => {
  const { values, setFieldValue, setValues, initialValues, dirty } =
    useFormikContext<BookingStepFormValue>();

  const { setShowModal, setModalCallback } = useAppContext() as any;
  const tripInfo = useSelector((state: StoreType) => state.search.tripInfo);
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    // setValues(initialValues);
  }, [tripInfo?.departureDate, tripInfo?.returnDate]);

  function onExpandChange(e, expanded: boolean) {
    // first time expand
    if (!values?.travelDetail?.[seatSelectionType]?.schedule || !dirty) {
      setFieldValue(
        `travelDetail.${seatSelectionType}.schedule`,
        schedule?.uuid,
      );
      return;
    }

    // if the schedule uuid is the same collapse the accordion
    if (
      values?.travelDetail?.[seatSelectionType]?.schedule === schedule?.uuid &&
      !expanded
    ) {
      setFieldValue(`travelDetail.${seatSelectionType}.schedule`, null);
      return;
    }

    // if there is no selected seats, set the schedule uuid without showing the modal
    if (
      !values?.travelDetail?.[seatSelectionType]?.selectedSeats?.length &&
      !values?.travelDetail?.[seatSelectionType].dropOffPoint &&
      !values?.travelDetail?.[seatSelectionType].boardingPoint
    ) {
      setFieldValue(
        `travelDetail.${seatSelectionType}.schedule`,
        schedule?.uuid,
      );

      return;
    }

    setModalCallback({
      onSuccess: () => {
        setValues(initialValues);
        setFieldValue(
          `travelDetail.${seatSelectionType}.schedule`,
          schedule?.uuid,
        );
      },
    });

    setShowModal(true);
  }

  const isExpanded =
    values?.travelDetail?.[seatSelectionType]?.schedule === schedule?.uuid &&
    !loading;

  return (
    <div className={s.sc_container}>
      <Accordion
        className={clsx([s.accordion, isExpanded && s.acc_expanded])}
        expanded={isExpanded}
        TransitionProps={{ unmountOnExit: true }}
        onChange={onExpandChange}
      >
        <AccordionSummary
          expandIcon={
            match && (
              <LoadingButton loading={loading} color="primary">
                <ExpandMore />
              </LoadingButton>
            )
          }
          className={s.sc_as}
          disabled={loading}
          sx={{}}
        >
          <ScheduleCardHeader
            disabled={loading}
            schedule={schedule}
            seatSelectionType={seatSelectionType}
          />
        </AccordionSummary>

        <AccordionDetails className={s.sc_accordion_details}>
          <SeatSelection
            seatSelectionType={seatSelectionType}
            schedule={schedule}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ScheduleCard;
