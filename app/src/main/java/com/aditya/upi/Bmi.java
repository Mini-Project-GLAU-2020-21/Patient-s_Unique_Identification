package com.aditya.upi;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.TextView;

public class Bmi extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bmi);

        EditText Weight,Height;
        TextView txtenter, txtbmi;

    }

    public float BMICalculate(float weight,float height)
    {
        return weight/(height * height);
    }

    public String interpretateBMI(float BMIvalues)
    {
        if( BMIvalues < 16)
        {
            return "Severly UnderWeight";
        }
        else if (BMIvalues < 18.5 )
        {
            return "UnderWeight";
        }
        else if (BMIvalues <25)
        {
            return "Normal";

        }
        else if (BMIvalues < 30)
        {
            return "OverWeight";
        }
        else
            return "Obese";
    }
}