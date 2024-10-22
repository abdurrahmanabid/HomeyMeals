import { featureData } from "../../store/featureData";
import CardWithIcon from "../CardwithIcon";
// Main Component
const FeaturesCard = () => { 

  return (
    <div className=" py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {featureData.map((feature, index) => (
          <CardWithIcon
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      
    </div>
  );
};

export default FeaturesCard;
