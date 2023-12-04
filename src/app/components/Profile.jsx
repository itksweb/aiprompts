import Feed from "./Feed";

const Profile = ({ name, desc, posts, setPosts }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <Feed posts={posts} setPosts={setPosts} />
    </section>
  );
};

export default Profile;
