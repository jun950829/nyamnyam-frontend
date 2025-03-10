import Btn from "../commons/buttons/Btn";

type Place = {
  id: string;
  place_name: string;
  category_name: string;
  phone: string;
  address_name: string;
  place_url: string;
}

interface SearchResultCardProps {
  place: Place;
  index: number;
  selected: number;
  setSelected: (index: number) => void;
  onClickHandlr: (searchText: string) => void;
}

export const SearchResultsCard = ({ place, index, selected, setSelected, onClickHandlr} : SearchResultCardProps) => {
    
    return (
      <div key={place.id} className={`flex flex-col pl-4 pt-4 pb-4 mr-4 border-b border-gray-400 gap-y-1 hover:bg-blue-100 ${selected === index ? `bg-blue-100` : ``}`} onClick={() => {
        setSelected(index);
        console.log('place.place_name', place.place_name)
        onClickHandlr(place.place_name);
        }}>
        <div className="text-right font-bold">{place.place_name}</div>
        <div className="text-right text-sm">{place.category_name}</div>
        <div className="address flex flex-row justify-between text-sm">
          <div className="text-right">주소</div>
        <div className="">{place.address_name}</div>
        </div>
        <div className="address flex flex-row justify-between text-sm">
          <div className="text-right">전화번호</div>
          <div className="text-right">{place.phone}</div>
        </div>
        <div className="button flex flex-row justify-end">
          <Btn label="자세히 보기" size="small" onClick={() => {
            window.open(`https://map.naver.com/p/search${place.place_name}`);
          }} />
        </div>
    </div>
    )
}