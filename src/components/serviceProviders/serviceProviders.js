import { useSelector } from 'react-redux';
import ServiceProvider from './serviceProvider';

const ServiceProviders = () => {
  const serviceProviders = useSelector(
    state => state?.serviceProvider?.serviceProviders,
  );

  return (
    <div className="w-full bg-black" id="serviceProviders">
      <div className="w-full flex items-center justify-center py-2">
        <h2 className="text-4xl font-bold">Service Providers</h2>
      </div>
      <div className="flex space-x-2 overflow-auto py-3">
        {serviceProviders?.map(serviceProvider => (
          <ServiceProvider serviceProvider={serviceProvider} />
        ))}
      </div>
    </div>
  );
};

export default ServiceProviders;
