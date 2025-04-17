const AchievementViewer = ({ achievement }) => {
  return (
    <div className="">
    <img src={achievement.image} alt={achievement.title} />
      <h2>{achievement.title}</h2>
      <p>{achievement.description}</p>
      
    </div>
  );
}

//place holder code for achievemevent viewer page