import art from "../../assets/data/BookCategoris/art.jpg";
import science from "../../assets/data/BookCategoris/science.jpg";
import biography from "../../assets/data/BookCategoris/biography.jpg";
import business from "../../assets/data/BookCategoris/business.jpg";
import fiction from "../../assets/data/BookCategoris/fiction.jpg";
import history from "../../assets/data/BookCategoris/history.jpg";
import language from "../../assets/data/BookCategoris/language.jpg";
import love from "../../assets/data/BookCategoris/love.jpg";
import medical from "../../assets/data/BookCategoris/medical.jpg";
import programming from "../../assets/data/BookCategoris/programming.jpg";
import selfHelp from "../../assets/data/BookCategoris/SelfHelp.jpg";
import technology from "../../assets/data/BookCategoris/Technology.jpg";
import sports from "../../assets/data/BookCategoris/Sports.png";

const CategoryCard = ({ category, selectedCategory, isActive = false }) => {
  const imagesMap = {
    art,
    science,
    biography,
    business,
    fiction,
    history,
    language,
    love,
    medical,
    programming,
    selfHelp,
    "self-help": selfHelp,
    sports,
    technology,
  };

  const imgSrc = imagesMap[category.name] || art;

  return (
    <div
      onClick={() => {
        selectedCategory(category.name);
      }}
      className={`group flex w-28 shrink-0 snap-start cursor-pointer flex-col rounded-2xl border p-2 text-sm transition-all duration-300 ${
        isActive
          ? "border-slate-950 bg-slate-950 text-white shadow-lg"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-md"
      }`}
    >
      <img
        className="w-full aspect-2/3 object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.03]"
        src={imgSrc}
        alt={category.name}
      />
      <h2 className="mt-3 truncate text-center font-semibold capitalize">
        {category.name}
      </h2>
    </div>
  );
};
export default CategoryCard;
