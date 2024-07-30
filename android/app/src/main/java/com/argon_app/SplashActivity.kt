package com.argon_app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.argon_app.MainActivity

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)

        val intent = Intent(this, MainActivity::class.java)
        // Pass along FCM messages/notifications etc.
        val extras = getIntent().extras
        if (extras != null) {
            intent.putExtras(extras)
        }

        startActivity(intent)
        finish()
    }
}