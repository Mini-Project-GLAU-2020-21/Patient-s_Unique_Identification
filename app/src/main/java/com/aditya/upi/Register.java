package com.aditya.upi;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;

import java.util.Objects;

public class Register extends AppCompatActivity {
    EditText txtEmail,txtPassword, txtConfirmPassword;
    Button btn_register;
    ProgressBar progressBar;
    private FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        Objects.requireNonNull(getSupportActionBar()).hide();
        txtEmail = (EditText) findViewById(R.id.EditEmail);
        txtPassword =(EditText)findViewById(R.id.Password);
        txtConfirmPassword = (EditText) findViewById(R.id.CPass);
        btn_register = (Button) findViewById(R.id.btn_Register);
        progressBar = (ProgressBar) findViewById(R.id.Progress);

      firebaseAuth = FirebaseAuth.getInstance();
btn_register.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
         String email =txtEmail.getText().toString().trim();
         String password = txtPassword.getText().toString().trim();
         String Cpass= txtConfirmPassword.getText().toString().trim();

         if (TextUtils.isEmpty(email))
         {
             Toast.makeText(Register.this, "Please Enter Email", Toast.LENGTH_SHORT).show();
         }

        if (TextUtils.isEmpty(password))
        {
            Toast.makeText(Register.this, "Please Enter Password", Toast.LENGTH_SHORT).show();
        }

        if (TextUtils.isEmpty(Cpass))
        {
            Toast.makeText(Register.this, "Please Enter Password", Toast.LENGTH_SHORT).show();
        }
        if (password.length()<6){
            Toast.makeText(Register.this, "Too Short", Toast.LENGTH_SHORT).show();
        }
        progressBar.setVisibility(View.VISIBLE);
        if (password.equals(Cpass))
        {
            firebaseAuth.createUserWithEmailAndPassword(email, password).addOnCompleteListener(Register.this, new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {

                            progressBar.setVisibility(View.GONE);
                            if (task.isSuccessful())
                            {
                                startActivity(new Intent(getApplicationContext(),Dash.class));
                                Toast.makeText(Register.this, "Registration Sucess..", Toast.LENGTH_SHORT).show();
                            }
                            else
                                {
                                    Toast.makeText(Register.this, "Authentication Failed", Toast.LENGTH_SHORT).show();
                            }

                            // ...
                        }
                    });
        }
    }
});
    }

    public void btn_signinForm(View view) {
        startActivity(new Intent(getApplicationContext(),login.class));
    }

}