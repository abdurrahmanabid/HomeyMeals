// Card Component
const CardWithIcon = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg">
      <Icon className="text-green-600 text-4xl mb-4" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};
export default CardWithIcon
