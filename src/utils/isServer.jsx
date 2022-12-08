import * as PusherPushNotifications from "@pusher/push-notifications-web";

export const isServer = typeof window === "undefined";

export const beamsClient =
  !isServer &&
  new PusherPushNotifications.Client({
    instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE_ID,
  });

export const initializeUser = (data, redirect) => {
  beamsClient
    .start()
    .then(deviceId => console.log("Successfully registered with Beams. Device ID"))
    .then(() => {
      const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/pusher/beams-auth`,
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      });
      beamsClient
        .addDeviceInterest(data.user._id.toString())
        .then(() => console.log("Successfully registered and subscribed!"))
        .then(() => beamsClient.getDeviceInterests())
        .then(interests => {
          console.log("Current interests");
        })
        .then(() => beamsClient.setUserId(data.user._id.toString(), beamsTokenProvider))
        .then(() => {
          console.log("User ID has been set");
        })
        .then(() => beamsClient.getUserId())
        .then(() => {
          console.log("success");
          if (redirect) {
            if (data.user?.role === "admin") {
              window.location.assign("/dashboard");
            } else {
              window.location.assign("/");
            }
          }
        })
        .catch(e => {
          console.error("Could not authenticate with Beams:", e);
        });
    });
};
