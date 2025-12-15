import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";
import { useState } from "react";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const handleDelete = async (activityId) => {
    setError(null);
    if (!token) {
      setError("You must be logged in to delete activities.");
      return;
    }

    try {
      await deleteActivity(token, activityId);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            {token && (
              <button onClick={() => handleDelete(activity.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
