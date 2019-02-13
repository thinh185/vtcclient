package com.erekalivestream;

import android.content.Intent;
import android.util.Log;

import com.evollu.react.fcm.MessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONException;
import org.json.JSONObject;

public class PusherReceiver extends MessagingService {
    private final String TAG = "PusherReceiver";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "Message data payload: " + remoteMessage.getData());

            try {
                String data = remoteMessage.getData().get("object_data");
                JSONObject jsonObject = new JSONObject(data);
                String objectType = jsonObject.getString("object_type");
                if (objectType != null && objectType.equals("calling")) {
                    Log.d(TAG, "Start App");
                    startActivity(new Intent(this, MainActivity.class));
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}

