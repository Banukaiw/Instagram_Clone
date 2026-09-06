import Suggestions from '../../components/Suggestions/Suggestions';
import Feed from '../../components/Feed/Feed';
import './Home.css';


function Home() {
  return (
    <div className="d-flex h-100 overflow-hidden">
      <div className="h-100 overflow-y-auto w-100 d-flex justify-content-center"style={{ scrollbarWidth: 'none' }}>
        <Feed />
      </div>

      <div className="suggest">
        <Suggestions />
      </div>
    </div>
  );
}

export default Home;