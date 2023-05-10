import { tripSteps } from './index';

export type BookingStepFormValue = {
  showModal: boolean;
  seatError: any;
  bookingError: any;
  passengersError?: any;
  travelDetail: {
    mainTravel: {
      schedule: string;
      selectedSeats: number[];
      boardingPoint: string;
      dropOffPoint: string;
    };
    returnTravel: {
      schedule: string;
      selectedSeats: number[];
      boardingPoint: string;
      dropOffPoint: string;
    };
  };
  passengersDetails: {
    age: number;
    phone: string;
    firstName: string;
    lastName: string;
    gender: string;
  }[];
};

export type BookObj = {
  scheduleUUId: string;
  roundTripScheduleUUId?: string;
  onBoardingUUId: string;
  offBoardingUUId: string;
  roundTripOnBoardingUUId?: string;
  roundTripOffBoardingUUId?: string;
  isRoundTrip: boolean;
  bookingDetails: [
    {
      seatNumber: string;
      roundTripSeatNumber?: string;

      passenger: {
        phoneNumber: string;
        fullName: string;
        age: number;
        gender: string;
      };
    },
  ];
};

export type SeatSelectionType = 'mainTravel' | 'returnTravel';
export type FormStepsContextType = {
  seatSelectionType: SeatSelectionType;
  prevStep: () => void;
  nextStep: (arg?: any) => void;
  activeStep: typeof tripSteps[number];
} & Record<string, any>;

export enum TripStepName {
  Departure = 'Departure Selection',
  Return = 'Return Selection',
  PassengersDetail = 'Passengers Info',
  Checkout = 'Checkout',
  Payment = 'Payment',
}
