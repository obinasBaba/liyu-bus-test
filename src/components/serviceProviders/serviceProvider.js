import './serviceProvider.css';

const ServiceProvider = ({ serviceProvider }) => {
  return (
    <div class="flex flex-wrap">
      <div class="w-full p-1 md:p-2">
        <div className="provider-image">
          <img
            alt={serviceProvider?.name}
            class="block object-cover object-center w-full h-full rounded-lg"
            src={serviceProvider?.image}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;
