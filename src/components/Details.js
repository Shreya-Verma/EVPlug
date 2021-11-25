import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import auth from '../api/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import Loader from './Loader';

const Details = ({details, add, remove}) => {

  const [fav, setFav] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const getDBList = async () => {
      setLoading(true);
      try {
        const token = await EncryptedStorage.getItem('token');
        await auth
          .get('/evplug/getFav', {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
          .then(resp => {
            const list = resp.data[0].fav;
            if(list.includes(details.ID)){
              setFav(true);
            }
          })
          .catch(err => {
            console.log("error")
          });
      } catch (err) {
        console.log("error")
      }
      setLoading(false);
    };

    getDBList();

  }, [fav]);
  



  const handleState = () => {
    if (fav) {
      console.log('remove');
      remove(details.ID);
     
    } else {
      // Add to list
      console.log('add');
      add(details.ID);
      setFav(true);
    }
  };

  return (
    <>
     {loading ? <Loader/>  : null}
      <View style={styles.nameFlex}>
        <Text style={styles.nameText}>{details.AddressInfo.Title}</Text>
        <Text style={{marginTop: 2}}>OCM-{details.ID}</Text>
        <Text>
          {details.AddressInfo.AddressLine1}, {details.AddressInfo.Town},{' '}
          {details.AddressInfo.StateOrProvince}
        </Text>
        <Text>
          {details.AddressInfo.Country.ISOCode}, {details.AddressInfo.Postcode}
        </Text>
        {details.AddressInfo.ContactTelephone1 ? (
          <Text>
            <Ionicons name="call-outline" color="white" size={15} />{' '}
            {details.AddressInfo.ContactTelephone1}
          </Text>
        ) : null}
        <Text>
          <Ionicons name="pin" color="white" size={15} />{' '}
          {details.AddressInfo.Latitude}, {details.AddressInfo.Longitude}
        </Text>

        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={handleState}>
            <Text>
              {fav ? (
                <Ionicons name="star" color={Colors.white} size={20} />
              ) : (
                <Ionicons name="star-outline" color={Colors.white} size={20} />
              )}{' '}
              Favourites
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollFlex}>
        <View style={styles.contentFlex}>
          <Text style={styles.boxHeading}>
            <Ionicons
              name="battery-charging-sharp"
              size={16}
              color={Colors.primary}
            />
            {'  '}
            Equipment Details
          </Text>
          <Text
            style={{
              color: Colors.black,
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 2,
            }}>
            Number Of Stations/Bays: {details.Connections.length}
          </Text>

          <View style={{marginTop: 10}}>
            {details.Connections.map((item, index) => (
              <View key={index} style={styles.listVieContainer}>
                <Text style={styles.listViewItemTitle}>
                  {item.StatusType ? (
                    item.StatusType.IsOperational ? (
                      <Ionicons name="checkbox" color="green" size={15} />
                    ) : (
                      <Ionicons name="checkbox" color="red" size={15} />
                    )
                  ) : null}
                  {item.ConnectionType.Title} : {item.Quantity}
                </Text>
                <Text style={styles.listViewItemSubTitle}>
                  {item.ConnectionType.FormalName}
                </Text>

                {item.CurrentType ? (
                  <Text style={styles.listViewItemSubTitle}>
                    {item.CurrentType.Title}, {item.PowerKW} kW
                  </Text>
                ) : null}
                {item.Amps || item.Voltage ? (
                  <Text style={styles.listViewItemSubTitle}>
                    {item.Amps}A {item.Voltage}V
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.contentFlex}>
          <Text style={styles.boxHeading}>
            <Ionicons name="book-sharp" color={Colors.primary} size={16} />
            {'  '}
            Usage Restrictions
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: Colors.black,
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            Usage :
          </Text>
          {details.UsageType ? (
            <Text style={styles.listViewItemSubTitle}>
              {details.UsageType.Title}
            </Text>
          ) : null}
          {details.UsageCost ? (
            <>
              <Text
                style={{
                  marginTop: 5,
                  color: Colors.black,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Usage Cost :
              </Text>
              <Text style={styles.listViewItemSubTitle}>
                {details.UsageCost}
              </Text>
            </>
          ) : null}

          {details.UserComments ? (
            <>
              <Text
                style={{
                  marginTop: 5,
                  color: Colors.black,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Comments :
              </Text>
              <Text style={styles.UserComments}>{details.UserComments}</Text>
            </>
          ) : null}
        </View>

        <View style={styles.contentFlex}>
          <Text style={styles.boxHeading}>
            <FontAwesome name="bolt" size={18} color={Colors.primary} />
            {'  '}
            Network/Operator
          </Text>
          {details.OperatorInfo ? (
            <>
              <Text style={{marginTop: 10, color: Colors.black, fontSize: 12}}>
                {details.OperatorInfo.Title}
              </Text>
              <Text style={{marginTop: 10, color: Colors.black, fontSize: 12}}>
                <Ionicons name="link" size={14} color={Colors.primary} />
                {'  '}
                {details.OperatorInfo.WebsiteURL}
              </Text>
            </>
          ) : null}
        </View>

        <View style={styles.contentFlex}>
          <Text style={styles.boxHeading}>
            <Ionicons
              name="information-circle-sharp"
              size={16}
              color={Colors.primary}
            />
            {'  '}
            Additional Information
          </Text>
          {details.GeneralComments ? (
            <Text style={{marginTop: 10, color: Colors.black, fontSize: 12}}>
              {details.GeneralComments}
            </Text>
          ) : null}

          {details.AddressInfo.AccessComments ? (
            <Text style={{marginTop: 10, color: Colors.black, fontSize: 12}}>
              {details.AddressInfo.AccessComments}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  nameFlex: {
    backgroundColor: Colors.detailsBannerGreen,
    height: 200,
    padding: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 3,
    textAlign: 'center',
  },
  scrollFlex: {
    flex: 2,
    margin: 5,
  },
  contentFlex: {
    backgroundColor: Colors.white,
    height: 'auto',
    borderRadius: 4,
    borderColor: Colors.grey,
    borderWidth: 1,
    marginBottom: 1,
    borderBottomColor: Colors.grey,
    padding: 10,
  },
  boxHeading: {
    color: Colors.lightGrey,
    fontSize: 16,
    fontWeight: 'bold',
    margin: 3,
  },
  listVieContainer: {
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
  listViewItemTitle: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  listViewItemSubTitle: {
    fontSize: 10,
    color: Colors.black,
    fontWeight: 'normal',
    marginTop: 4,
  },
});
