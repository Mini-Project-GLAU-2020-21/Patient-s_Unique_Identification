package com.aditya.upi;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class Dash extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dash);
    }

    public void btn_BMI(View view)
    {
        startActivity(new Intent(getApplicationContext(),Bmi.class));
    }
    public void btn_Profile(View view)
    {
        startActivity(new Intent(getApplicationContext(),Profile.class));
    }
}

