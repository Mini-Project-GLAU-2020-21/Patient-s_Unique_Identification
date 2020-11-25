package com.aditya.upi;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

public class ViewReport extends AppCompatActivity {
    ListView myReportList;
    DatabaseReference databaseReference;
    List<pdf> uploadreport;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_report);

        myReportList= (ListView) findViewById(R.id.myListView);
        uploadreport = new ArrayList<>();
        
        viewAllFiles();

        myReportList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                pdf pdf =uploadreport.get(i);

                Intent intent = new Intent();
                intent.setData(Uri.parse(pdf .getUrl()));
                startActivity(intent);

            }
        });

    }

    private void viewAllFiles() {
databaseReference = FirebaseDatabase.getInstance().getReference("uploads");
databaseReference.addValueEventListener(new ValueEventListener() {
    @Override
    public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

        for (DataSnapshot postSnapshot: dataSnapshot.getChildren())
        {
            pdf pdf= postSnapshot.getValue(com.aditya.upi.pdf.class );
            uploadreport.add(pdf);
                    }
        String[] uploads = new String[(uploadreport.size()) ];
        for (int i=0;i<uploads.length;i++)
        {
            uploads[i] = uploadreport.get(i).getName();

        }
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getApplicationContext(),android.R.layout.simple_list_item_1,uploads) {
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {

                View view = super.getView(position,convertView,parent);
                TextView mytext= (TextView) view.findViewById(android.R.id.text1);
                mytext.setTextColor(Color.BLACK);


                return view;
            }
        };
        myReportList.setAdapter(adapter);


    }

    @Override
    public void onCancelled(@NonNull DatabaseError error) {

    }
});
    }
}