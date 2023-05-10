import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../components/button/primaryButton';
import NavBar from '../../layout/TopNavBar/navbar';
import { demohtmltopdf } from '../../services/utils';

const TravelTicket = () => {
  const { passengersDetails } = useSelector(state => state?.booking);

  return (
    <div className="flex flex-col  bg-no-repeat bg-cover bg-center bg-fixed">
      <NavBar />
      <div className=" py-3">
        <div className="w-11/12 mx-auto text-left">
          <div className="flex flex-col text-white pt-7">
            <span className="text-2xl font-extrabold">
              THANK YOU FOR TRAVELING WITH US
            </span>
            <span className="text-sm my-3 font-thin">
              You can find your ticket here
            </span>
            <span className="text-[#FF6B1B] text-md my-2">WARNING</span>
            <span className="text-sm mb-3">
              Dont forget to bring your tikcet on the departure date
            </span>
            {/* {passengersDetails?.main?.selectedSeats?.map(() => {
              return ( */}
            <div id="ticket">
              <div className=" w-10/12 grid grid-cols-3">
                <div className="col-span-2 h-full bg-[whitesmoke] rounded">
                  <div className="h-full flex flex-col mx-5 text-black">
                    <div className="flex items-end justify-between border border-2 border-blue-400 border-x-0 border-t-0 my-3 py-2">
                      <div className="flex items-center space-x-2">
                        <span className="h-10 w-10 bg-[#FF6B1B]"></span>
                        <span className="text-2xl text-[#FF6B1B]">LIYU</span>
                      </div>
                      <span className="text-black text-xs">
                        09197517 3759231 021 21 A
                      </span>
                    </div>
                    <span className="text-sm">PASSENGER NAME</span>
                    <div className="flex">
                      <div className="flex flex-col">
                        <span className="text-xl">YARED ENDALE</span>
                        <div className="ml-3 my-1 grid grid-cols-5 gap-2">
                          <div className="flex flex-col justify-around">
                            <span className="text-xs">BUS NAME</span>
                            <span className="text-xs">SEAT</span>
                            <span className="text-xs">ON BOARDING</span>
                            <span className="text-xs">DEPARTURE TIME</span>
                            <span className="text-xs">AMOUNT PAID (NUM)</span>
                          </div>
                          <div className="flex flex-col justify-around">
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              ABAY
                            </span>
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              43A
                            </span>
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              MESKEL SQ
                            </span>
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              DD/MM/YY
                            </span>
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              1000.00
                            </span>
                          </div>
                          <div className="flex flex-col justify-around">
                            <span className="text-xs">FROM</span>
                            <span className="text-xs">TO</span>
                            <span className="text-xs">OFF BOARDING</span>
                            <span className="text-xs">DEPARTURE TIME</span>
                            <span className="text-xs">AMOUNT PAID (WORD)</span>
                          </div>
                          <div className="flex flex-col justify-around">
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              ADDIS ABABA
                            </span>
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              BAHIR DAR
                            </span>
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              MENAHRIYA
                            </span>
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              09:00 PM
                            </span>
                            <span className="text-xs bg-white py-1 font-semibold pl-1 my-1">
                              ONE THOUSAND BIRR
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="h-[100px] w-[100px]">
                              <QRCode
                                size={256}
                                style={{
                                  height: 'auto',
                                  maxWidth: '100%',
                                  width: '100%',
                                }}
                                value="784545A"
                                viewBox={`0 0 256 256`}
                              />
                            </div>
                            <span className="text-xs">784545A</span>
                          </div>
                        </div>
                        <div className="flex flex-col text-[#FF6B1B] space-y-1 my-4 font-bold">
                          <span className="text-center text-sm ">REMINDER</span>
                          <p className="text-center text-xs">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 h-full bg-[#FF6B1B] rounded">
                  <div className="w-full h-full flex flex-col">
                    <div className="flex items-center justify-center border border-white border-x-0 border-t-0 mx-3 my-3 py-2">
                      <span className="h-10 w-10 bg-red-300 border border-white border-y-0 border-l-0 p-2"></span>
                      <span className="text-2xl">LIYU TICKETING</span>
                    </div>
                    <span className="text-center text-2xl my-2">
                      YARED ENDALE
                    </span>
                    <div className="grid grid-cols-4 gap-2 mx-3">
                      <div className="flex flex-col justify-around space-y-2">
                        <span className="text-xs font-thin">BUS</span>
                        <span className="text-xs font-thin">SEAT</span>
                        <span className="text-xs font-thin">DEP.TIME</span>
                      </div>
                      <div className="flex flex-col justify-around space-y-2">
                        <span className="text-xs font-thin">ABAY</span>
                        <span className="text-xs font-thin">43A</span>
                        <span className="text-xs font-thin">09:00 PM</span>
                      </div>
                      <div className="flex flex-col justify-around space-y-2">
                        <span className="text-xs font-thin">FROM</span>
                        <span className="text-xs font-thin">TO</span>
                        <span className="text-xs font-thin">DEP.TIME</span>
                      </div>
                      <div className="flex flex-col justify-around space-y-2">
                        <span className="text-xs font-thin">ADDIS ABABA</span>
                        <span className="text-xs font-thin">BAHIRDAR</span>
                        <span className="text-xs font-thin">DD/MM/YY</span>
                      </div>
                    </div>
                    <div className="my-auto flex flex-col items-center justify-center">
                      <div className="h-[100px] w-[100px]">
                        <QRCode
                          size={256}
                          style={{
                            height: 'auto',
                            maxWidth: '100%',
                            width: '100%',
                          }}
                          value="784545A"
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                      <span className="text-xs">784545A</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-5">
              <PrimaryButton
                label={'PRINT'}
                onClick={() => {
                  demohtmltopdf('ticket', 'ticket1');
                }}
                className="rounded-none"
              />
              <PrimaryButton
                label={'DOWNLOAD'}
                onClick={() => {
                  demohtmltopdf('ticket', 'ticket1');
                }}
                className="rounded-none"
              />
            </div>
            {/* );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTicket;
