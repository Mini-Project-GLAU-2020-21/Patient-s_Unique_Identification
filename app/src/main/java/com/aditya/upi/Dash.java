package com.aditya.upi;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import java.util.Objects;

public class Dash extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dash);
        Objects.requireNonNull(getSupportActionBar()).hide();
    }

    public void btn_BMI(View view)
    {
        startActivity(new Intent(getApplicationContext(),Bmi.class));
    }
    public void btn_Profile(View view)
    {
        startActivity(new Intent(getApplicationContext(),Profile.class));
    }

    public void btn_upload(View view)
    {
        startActivity(new Intent(getApplicationContext(),upload.class));
    }

    public void btn_records(View view)
    {
        startActivity(new Intent(getApplicationContext(),Todo.class));
    }

    public void btn_todo(View view)
    {
        startActivity(new Intent(getApplicationContext(),Todo.class));
    }

    public void btn_view(View view) {
        startActivity(new Intent(getApplicationContext(),ViewReport.class));
    }
}

